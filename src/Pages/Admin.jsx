import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "../Styles/admin.css";

const Admin = () => {
  const [scrambles, setScrambles] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    fetchScrambles();
  }, []);

  const fetchScrambles = async () => {
    try {
      const resp = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/scrambles`
      );
      const result = await resp.json();

      if (result.status === "success") {
        setScrambles(result.data.scrambles);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async (data) => {
    const userId = localStorage.getItem("userId");

    try {
      const resp = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/scrambles`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            scramble: data.scramble,
            userId: userId,
          }),
        }
      );

      if (resp.ok) {
        const result = await resp.json();
        setScrambles([...scrambles, result.data]);
        reset();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeScramble = async (id) => {
    const userId = localStorage.getItem("userId");

    try {
      const resp = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/v1/scrambles/${id}?userId=${userId}`,
        {
          method: "DELETE",
        }
      );

      if (resp.ok) {
        setScrambles(scrambles.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="admin-container">
      <h1>Admin - Manage Scrambles</h1>

      <div className="add-scramble">
        <h2>Add New Scramble</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Enter scramble"
            {...register("scramble", { required: true })}
          />
          <button type="submit">Add</button>
        </form>
      </div>

      <div className="scrambles-list">
        <h2>Existing Scrambles</h2>
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Scramble</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {scrambles.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.scramble}</td>
                <td>
                  <button onClick={() => removeScramble(item._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
