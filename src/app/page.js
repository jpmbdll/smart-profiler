"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { getInsuranceRecommendation } from "./gemini-service";

const InsuranceForm = () => {
  const [clientDetails, setClientDetails] = useState({
    age: "",
    income: "",
    healthConditions: "",
    familySize: "",
  });
  const [recommendation, setRecommendation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setClientDetails({ ...clientDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setRecommendation("");
    try {
      const result = await getInsuranceRecommendation(clientDetails);
      setRecommendation(result);
    } catch (err) {
      setRecommendation(
        "An error occurred while generating the recommendation."
      );
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: "30px", margin: "auto" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          backgroundColor: "#f5f5f5",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <input
          name="age"
          placeholder="Age"
          onChange={handleChange}
          style={{ padding: "12px", fontSize: "16px", borderRadius: "5px" }}
        />
        <input
          name="income"
          placeholder="Income"
          onChange={handleChange}
          style={{ padding: "12px", fontSize: "16px", borderRadius: "5px" }}
        />
        <input
          name="healthConditions"
          placeholder="Health Conditions"
          onChange={handleChange}
          style={{ padding: "12px", fontSize: "16px", borderRadius: "5px" }}
        />
        <input
          name="familySize"
          placeholder="Family Size"
          onChange={handleChange}
          style={{ padding: "12px", fontSize: "16px", borderRadius: "5px" }}
        />
        <button
          type="submit"
          disabled={isLoading}
          style={{
            padding: "12px",
            fontSize: "16px",
            backgroundColor: isLoading ? "#aaa" : "#3498db",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
        >
          {isLoading ? "Loading..." : "Get Recommendation"}
        </button>
      </form>

      {recommendation && !isLoading && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            borderRadius: "8px",
            lineHeight: 1.6,
          }}
        >
          <h3 style={{ marginTop: 0 }}>Recommended Plan:</h3>
          <ReactMarkdown>{recommendation}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default InsuranceForm;
