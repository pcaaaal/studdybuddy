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


app.get('/study-groups-with-members', (req, res) => {
    const groupQuery = 'SELECT * FROM study_groups';

    db.all(groupQuery, [], (err, groups) => {
        if (err) return res.status(500).json({ error: err.message });

        const getMembersForGroup = (groupId) => {
            return new Promise((resolve, reject) => {
                const query = `
                    SELECT u.name FROM users u
                    JOIN group_members gm ON u.id = gm.user_id
                    WHERE gm.group_id = ?
                `;
                db.all(query, [groupId], (err, rows) => {
                    if (err) return reject(err);
                    const memberNames = rows.map((r) => r.name);
                    resolve(memberNames);
                });
            });
        };

        Promise.all(
            groups.map(async (group) => ({
                ...group,
                members: await getMembersForGroup(group.id)
            }))
        )
            .then((fullGroups) => res.json(fullGroups))
            .catch((error) => res.status(500).json({ error: error.message }));
    });
});

app.post('/assign-random-colors', (req, res) => {
    const colorPalette = [
        '#0079C7', '#143A85', '#6F2282', '#CF4082',
        '#E84E10', '#F27E00', '#FCBB00', '#FFDE15',
        '#B76000', '#00973B', '#00A59B'
    ];

    db.all('SELECT id FROM study_groups', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });

        const updates = rows.map(group => {
            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            return new Promise((resolve, reject) => {
                db.run('UPDATE study_groups SET color = ? WHERE id = ?', [color, group.id], function (err) {
                    if (err) reject(err);
                    else resolve();
                });
            });
        });

        Promise.all(updates)
            .then(() => res.json({ success: true }))
            .catch(error => res.status(500).json({ error: error.message }));
    });
});

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
