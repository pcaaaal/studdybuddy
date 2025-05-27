const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./study_groups.db');

app.get('/users', (req, res) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.get('/study-groups/:id', (req, res) => {
    const groupId = req.params.id;
    db.get('SELECT * FROM study_groups WHERE id = ?', [groupId], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: 'Study group not found' });
        res.json(row);
    });
});

app.get('/study-groups', (req, res) => {
    db.all('SELECT * FROM study_groups', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.get('/group-members/:groupId', (req, res) => {
    const groupId = req.params.groupId;
    const query = `
    SELECT u.* FROM users u
    JOIN group_members gm ON u.id = gm.user_id
    WHERE gm.group_id = ?
  `;
    db.all(query, [groupId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.get('/events/:groupId', (req, res) => {
    const groupId = req.params.groupId;
    db.all('SELECT * FROM events WHERE group_id = ?', [groupId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post('/group-members', (req, res) => {
    const { user_id, group_id } = req.body;
    const query = `INSERT OR IGNORE INTO group_members (user_id, group_id) VALUES (?, ?)`;

    db.run(query, [user_id, group_id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, inserted: this.changes });
    });
});

app.delete('/group-members/:groupId/:userId', (req, res) => {
    const { groupId, userId } = req.params;
    const query = `DELETE FROM group_members WHERE group_id = ? AND user_id = ?`;

    db.run(query, [groupId, userId], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, deleted: this.changes });
    });
});

app.get('/user-study-groups/:userId', (req, res) => {
    const { userId } = req.params;
    const query = `
    SELECT sg.id, sg.name, sg.description
    FROM study_groups sg
    JOIN group_members gm ON sg.id = gm.group_id
    WHERE gm.user_id = ?
  `;
    db.all(query, [userId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.get('/events/:groupId', (req, res) => {
    const { groupId } = req.params;
    const query = `SELECT * FROM events WHERE group_id = ?`;
    db.all(query, [groupId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
