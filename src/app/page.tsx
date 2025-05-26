export default function HomePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome Back, John</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded shadow col-span-1">
            <h2 className="font-semibold mb-2">My Study Groups</h2>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Mathematik</li>
              <li>Physik</li>
              <li>Informatik</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded shadow col-span-2">
            <h2 className="font-semibold mb-4">Explore Study Groups</h2>
            <div className="space-y-2">
              <div className="bg-yellow-100 p-3 rounded">Mathematical Insights Circle</div>
              <div className="bg-blue-100 p-3 rounded">Physics Explorers Forum</div>
              <div className="bg-green-100 p-3 rounded">Chem Collective</div>
              <div className="bg-pink-100 p-3 rounded">Life Sciences Roundtable</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
