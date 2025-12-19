import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "../Styles/history.css";

const History = () => {
  const [solves, setSolves] = useState([]);
  const [editId, setEditId] = useState(null);
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        return;
      }

      try {
        const resp = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/solves/user/${userId}`
        );
        const result = await resp.json();
        setSolves(result.data.solves);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const deleteSolve = async (id) => {
    try {
      const resp = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/solves/${id}`,
        {
          method: "DELETE",
        }
      );

      if (resp.ok) {
        setSolves(solves.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const startEdit = (id, time) => {
    setEditId(id);
    setValue("time", time);
  };

  const onSubmit = async (data) => {
    try {
      const resp = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/solves/${editId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            time: data.time,
          }),
        }
      );

      if (resp.ok) {
        setSolves(
          solves.map((item) =>
            item._id === editId ? { ...item, time: data.time } : item
          )
        );
        setEditId(null);
        setValue("time", "");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const cancelEdit = () => {
    setEditId(null);
    setValue("time", "");
  };

  return (
    <div className="history-container">
      <h1>Solve History</h1>

      <div className="history-table">
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {solves.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  {editId === item._id ? (
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <input type="text" {...register("time")} />
                    </form>
                  ) : (
                    item.time
                  )}
                </td>
                <td>
                  {editId === item._id ? (
                    <div className="edit-buttons">
                      <button onClick={handleSubmit(onSubmit)}>Save</button>
                      <button onClick={cancelEdit}>Cancel</button>
                    </div>
                  ) : (
                    <div className="action-buttons">
                      <button onClick={() => startEdit(item._id, item.time)}>
                        Update
                      </button>
                      <button onClick={() => deleteSolve(item._id)}>
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
