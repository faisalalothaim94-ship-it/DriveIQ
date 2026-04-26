import React, { useMemo, useState } from "react";

const cars = [
  {
    id: 1,
    make: "Toyota",
    model: "Camry",
    year: 2025,
    type: "Sedan",
    fuel: "Petrol",
    price: 25000,
    engine: "2.5L Inline-4",
    horsepower: 203,
    acceleration: 7.6,
    economy: 32,
    safety: 4.8,
    design: 4.2,
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=900&q=80",
    bestFor: "Daily driving and reliability",
    note: "Balanced choice with strong fuel economy and comfortable design."
  },
  {
    id: 2,
    make: "Honda",
    model: "Accord",
    year: 2024,
    type: "Sedan",
    fuel: "Hybrid",
    price: 28000,
    engine: "2.0L Hybrid",
    horsepower: 204,
    acceleration: 6.7,
    economy: 44,
    safety: 4.9,
    design: 4.3,
    image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=900&q=80",
    bestFor: "Efficiency and family comfort",
    note: "Excellent fuel efficiency with a smooth driving experience."
  },
  {
    id: 3,
    make: "Ford",
    model: "Mustang",
    year: 2025,
    type: "Coupe",
    fuel: "Petrol",
    price: 45000,
    engine: "5.0L V8",
    horsepower: 480,
    acceleration: 4.2,
    economy: 18,
    safety: 4.1,
    design: 4.8,
    image: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=900&q=80",
    bestFor: "Performance and sporty design",
    note: "High power and exciting acceleration, but lower fuel efficiency."
  },
  {
    id: 4,
    make: "BMW",
    model: "M340i xDrive",
    year: 2025,
    type: "Sedan",
    fuel: "Petrol",
    price: 58500,
    engine: "3.0L Turbo Inline-6",
    horsepower: 382,
    acceleration: 4.4,
    economy: 26,
    safety: 4.7,
    design: 4.7,
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=80",
    bestFor: "Luxury performance",
    note: "Strong performance with premium comfort and technology."
  },
  {
    id: 5,
    make: "Tesla",
    model: "Model 3",
    year: 2025,
    type: "Sedan",
    fuel: "Electric",
    price: 39990,
    engine: "Dual Motor Electric",
    horsepower: 425,
    acceleration: 3.1,
    economy: 130,
    safety: 4.9,
    design: 4.6,
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=900&q=80",
    bestFor: "Electric efficiency and technology",
    note: "Very efficient and fast, with modern digital features."
  },
  {
    id: 6,
    make: "Hyundai",
    model: "Tucson Hybrid",
    year: 2025,
    type: "SUV",
    fuel: "Hybrid",
    price: 34000,
    engine: "1.6L Turbo Hybrid",
    horsepower: 226,
    acceleration: 7.1,
    economy: 38,
    safety: 4.8,
    design: 4.4,
    image: "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?auto=format&fit=crop&w=900&q=80",
    bestFor: "Family use and practical efficiency",
    note: "A practical SUV with good safety and fuel economy."
  }
];

const unique = (field) => ["All", ...Array.from(new Set(cars.map((car) => car[field])))];

function normalize(value, min, max, invert = false) {
  if (max === min) return 50;
  const score = ((value - min) / (max - min)) * 100;
  return Math.round(invert ? 100 - score : score);
}

function getScores(car) {
  const hpValues = cars.map((c) => c.horsepower);
  const accValues = cars.map((c) => c.acceleration);
  const ecoValues = cars.map((c) => c.economy);
  const priceValues = cars.map((c) => c.price);

  const performance = Math.round(
    (normalize(car.horsepower, Math.min(...hpValues), Math.max(...hpValues)) +
      normalize(car.acceleration, Math.min(...accValues), Math.max(...accValues), true)) / 2
  );

  const efficiency = normalize(car.economy, Math.min(...ecoValues), Math.max(...ecoValues));
  const value = normalize(car.price, Math.min(...priceValues), Math.max(...priceValues), true);
  const safety = Math.round((car.safety / 5) * 100);
  const design = Math.round((car.design / 5) * 100);

  const total = Math.round(
    performance * 0.3 +
      efficiency * 0.25 +
      safety * 0.2 +
      design * 0.15 +
      value * 0.1
  );

  return { performance, efficiency, value, safety, design, total };
}

function StatBar({ label, value }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm font-semibold text-slate-700">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="mt-1 h-2 rounded-full bg-slate-200">
        <div className="h-2 rounded-full bg-slate-900" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function CarCard({ car, isSelected, onToggle }) {
  const scores = getScores(car);

  return (
    <div
      className={`overflow-hidden rounded-3xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${
        isSelected ? "border-slate-950 ring-2 ring-slate-950" : "border-slate-200"
      }`}
    >
      <div className="relative h-44">
        <img
          src={car.image}
          alt={`${car.make} ${car.model}`}
          className="h-full w-full object-cover"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold">
          {car.fuel}
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold">
          Score {scores.total}
        </span>
      </div>

      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {car.year} • {car.type}
        </p>
        <h3 className="mt-1 text-xl font-black text-slate-950">
          {car.make} {car.model}
        </h3>
        <p className="mt-1 text-sm text-slate-600">{car.bestFor}</p>

        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-2xl bg-slate-100 p-3">
            <span className="block text-slate-500">0–100 km/h</span>
            <b>{car.acceleration}s</b>
          </div>
          <div className="rounded-2xl bg-slate-100 p-3">
            <span className="block text-slate-500">Efficiency</span>
            <b>{car.economy} MPG/e</b>
          </div>
          <div className="rounded-2xl bg-slate-100 p-3">
            <span className="block text-slate-500">Power</span>
            <b>{car.horsepower} hp</b>
          </div>
          <div className="rounded-2xl bg-slate-100 p-3">
            <span className="block text-slate-500">Price</span>
            <b>${car.price.toLocaleString()}</b>
          </div>
        </div>

        <button
          onClick={() => onToggle(car.id)}
          className="mt-4 w-full rounded-2xl bg-slate-950 px-4 py-3 font-bold text-white hover:bg-slate-800"
        >
          {isSelected ? "Remove from Comparison" : "Add to Comparison"}
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const [make, setMake] = useState("All");
  const [fuel, setFuel] = useState("All");
  const [body, setBody] = useState("All");
  const [selected, setSelected] = useState([5, 2]);

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const searchable = `${car.make} ${car.model} ${car.year}`.toLowerCase();
      return (
        searchable.includes(query.toLowerCase()) &&
        (make === "All" || car.make === make) &&
        (fuel === "All" || car.fuel === fuel) &&
        (body === "All" || car.type === body)
      );
    });
  }, [query, make, fuel, body]);

  const selectedCars = cars.filter((car) => selected.includes(car.id));

  const winner =
    selectedCars.length > 0
      ? selectedCars.reduce((best, car) =>
          getScores(car).total > getScores(best).total ? car : best
        )
      : null;

  function toggleSelected(id) {
    setSelected((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id);
      if (current.length < 3) return [...current, id];
      return [current[1], current[2], id];
    });
  }

  function resetFilters() {
    setQuery("");
    setMake("All");
    setFuel("All");
    setBody("All");
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <header className="bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-14 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="inline-block rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
              IB Personal Project Booth Day
            </div>
            <h1 className="mt-6 text-4xl font-black tracking-tight md:text-6xl">
              DriveIQ: Car Performance Comparison
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-300">
              Explore efficiency, safety, design, and performance through an interactive
              website created for a Grade 10 IB Personal Project.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="rounded-full bg-white px-4 py-2 font-bold text-slate-950">
                Efficiency
              </span>
              <span className="rounded-full bg-white px-4 py-2 font-bold text-slate-950">
                Safety
              </span>
              <span className="rounded-full bg-white px-4 py-2 font-bold text-slate-950">
                Design
              </span>
              <span className="rounded-full bg-white px-4 py-2 font-bold text-slate-950">
                Performance
              </span>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 text-slate-950 shadow-2xl">
            <h2 className="text-2xl font-black">Project Aim</h2>
            <p className="mt-3 text-slate-600">
              To help visitors compare cars using clear data, simple explanations, and
              visual scores instead of relying only on brand reputation or personal opinion.
            </p>
            <div className="mt-6 grid gap-3">
              <div className="rounded-2xl bg-slate-100 p-4 font-semibold">
                Search and filter models
              </div>
              <div className="rounded-2xl bg-slate-100 p-4 font-semibold">
                Compare up to three cars
              </div>
              <div className="rounded-2xl bg-slate-100 p-4 font-semibold">
                View an overall recommendation
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-10 px-6 py-10">
        <section className="grid gap-4 rounded-3xl bg-white p-5 shadow-sm lg:grid-cols-[1fr_170px_170px_170px_auto]">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by make, model, or year..."
            className="h-12 rounded-2xl border border-slate-200 px-4 outline-none focus:border-slate-900"
          />
          <select
            value={make}
            onChange={(e) => setMake(e.target.value)}
            className="h-12 rounded-2xl border border-slate-200 px-4 outline-none"
          >
            {unique("make").map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <select
            value={fuel}
            onChange={(e) => setFuel(e.target.value)}
            className="h-12 rounded-2xl border border-slate-200 px-4 outline-none"
          >
            {unique("fuel").map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <select
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="h-12 rounded-2xl border border-slate-200 px-4 outline-none"
          >
            {unique("type").map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <button
            onClick={resetFilters}
            className="h-12 rounded-2xl border border-slate-300 px-5 font-bold hover:bg-slate-100"
          >
            Reset
          </button>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredCars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                isSelected={selected.includes(car.id)}
                onToggle={toggleSelected}
              />
            ))}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black">Live Comparison</h2>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-bold">
                  {selectedCars.length}/3
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-600">
                Select up to three cars to compare side-by-side.
              </p>

              <div className="mt-5 space-y-4">
                {selectedCars.length === 0 && (
                  <p className="rounded-2xl bg-slate-100 p-4 text-sm text-slate-600">
                    No cars selected yet.
                  </p>
                )}

                {selectedCars.map((car) => {
                  const scores = getScores(car);
                  return (
                    <div key={car.id} className="rounded-2xl border border-slate-200 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-black">
                            {car.make} {car.model}
                          </h3>
                          <p className="text-sm text-slate-500">{car.engine}</p>
                        </div>
                        <b className="rounded-full bg-slate-950 px-3 py-1 text-sm text-white">
                          {scores.total}
                        </b>
                      </div>
                      <div className="mt-4">
                        <StatBar label="Performance" value={scores.performance} />
                        <StatBar label="Efficiency" value={scores.efficiency} />
                        <StatBar label="Safety" value={scores.safety} />
                        <StatBar label="Design" value={scores.design} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {winner && (
              <div className="rounded-3xl bg-slate-950 p-6 text-white shadow-sm">
                <h2 className="text-2xl font-black">Best Overall</h2>
                <h3 className="mt-4 text-3xl font-black">
                  {winner.make} {winner.model}
                </h3>
                <p className="mt-2 text-slate-300">{winner.note}</p>
                <div className="mt-5 rounded-2xl bg-white/10 p-4 text-sm text-slate-200">
                  Recommendation is based on a weighted score: performance, efficiency,
                  safety, design, and value.
                </div>
              </div>
            )}
          </aside>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="text-2xl font-black">Detailed Comparison Table</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead>
                  <tr className="bg-slate-100 text-slate-600">
                    <th className="rounded-l-2xl p-4">Specification</th>
                    {selectedCars.map((car, index) => (
                      <th
                        key={car.id}
                        className={`p-4 ${
                          index === selectedCars.length - 1 ? "rounded-r-2xl" : ""
                        }`}
                      >
                        {car.make} {car.model}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Year", "year"],
                    ["Body Type", "type"],
                    ["Fuel", "fuel"],
                    ["Engine", "engine"],
                    ["Horsepower", "horsepower"],
                    ["0–100 km/h", "acceleration"],
                    ["Efficiency", "economy"],
                    ["Safety", "safety"],
                    ["Price", "price"]
                  ].map(([label, field]) => (
                    <tr key={field} className="border-b border-slate-100">
                      <td className="p-4 font-bold text-slate-700">{label}</td>
                      {selectedCars.map((car) => {
                        let value = car[field];
                        if (field === "price") value = `$${car.price.toLocaleString()}`;
                        if (field === "acceleration") value = `${car.acceleration}s`;
                        if (field === "economy") value = `${car.economy} MPG/e`;
                        if (field === "safety") value = `${car.safety}/5`;
                        return (
                          <td key={`${car.id}-${field}`} className="p-4 text-slate-600">
                            {value}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black">Booth Explanation</h2>
            <p className="mt-4 text-slate-600">
              This product shows how research, analysis, communication, and technology can
              work together. Visitors can test different comparisons and see that every car
              has strengths and trade-offs.
            </p>
            <div className="mt-5 space-y-3 text-sm">
              <p className="rounded-2xl bg-slate-100 p-4">
                <b>Performance:</b> speed and engine power.
              </p>
              <p className="rounded-2xl bg-slate-100 p-4">
                <b>Efficiency:</b> fuel economy or electric efficiency.
              </p>
              <p className="rounded-2xl bg-slate-100 p-4">
                <b>Safety:</b> safety score.
              </p>
              <p className="rounded-2xl bg-slate-100 p-4">
                <b>Design:</b> comfort, appearance, and usability.
              </p>
            </div>
          </div>
        </section>

        <footer className="rounded-3xl bg-white p-6 text-center text-sm text-slate-500 shadow-sm">
          <p>
            Created for Faisal Fahad Abdullah Alothaim’s Grade 10 IB Personal Project:
            Car Performance Comparison.
          </p>
          <p className="mt-2">
            Note: Replace sample data/images with the final researched data before official
            presentation.
          </p>
        </footer>
      </main>
    </div>
  );
}
