import React from "react";

export default function App() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#f8fafc",
      fontFamily: "Arial, sans-serif",
      padding: "40px"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto"
      }}>
        
        <header style={{
          background: "#0f172a",
          color: "white",
          padding: "40px",
          borderRadius: "20px",
          marginBottom: "30px"
        }}>
          <h1 style={{
            fontSize: "48px",
            marginBottom: "15px"
          }}>
            DriveIQ
          </h1>

          <p style={{
            fontSize: "20px",
            lineHeight: "1.6"
          }}>
            Car Performance Comparison Website for IB Personal Project
          </p>
        </header>

        <section style={{
          background: "white",
          padding: "30px",
          borderRadius: "20px",
          marginBottom: "30px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
        }}>
          <h2 style={{
            fontSize: "32px",
            marginBottom: "20px"
          }}>
            Project Aim
          </h2>

          <p style={{
            fontSize: "18px",
            lineHeight: "1.7"
          }}>
            This interactive website helps users compare different cars based on
            performance, fuel efficiency, safety, design, and overall value.
            It was developed as part of the IB Personal Project to demonstrate
            research, analysis, and digital product creation.
          </p>
        </section>

        <section style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px"
        }}>
          
          <div style={{
            background: "white",
            padding: "25px",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
          }}>
            <h3>⚡ Performance</h3>
            <p>Compare speed, horsepower, and acceleration.</p>
          </div>

          <div style={{
            background: "white",
            padding: "25px",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
          }}>
            <h3>⛽ Efficiency</h3>
            <p>Analyze fuel economy and electric efficiency.</p>
          </div>

          <div style={{
            background: "white",
            padding: "25px",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
          }}>
            <h3>🛡 Safety</h3>
            <p>Review safety scores and reliability ratings.</p>
          </div>

          <div style={{
            background: "white",
            padding: "25px",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
          }}>
            <h3>🎨 Design</h3>
            <p>Evaluate comfort, technology, and visual appeal.</p>
          </div>

        </section>

        <footer style={{
          marginTop: "40px",
          textAlign: "center",
          color: "#64748b"
        }}>
          <p>
            Created by Faisal Fahad Abdullah Alothaim — IB Personal Project
          </p>
        </footer>

      </div>
    </div>
  );
}
