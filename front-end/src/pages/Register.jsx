import { useState, useContext } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../context/userContext'; // Update the import path

const Register = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); // Use the setUser function from UserContext

  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const registerUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = data;

    try {
      const { data } = await axios.post('/register', {
        name, email, password
      });

      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success('Registration Successful, Welcome!');
        navigate('/login');

        // Update the user data in the context after a successful registration
        setUser({ name, email });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      <div className="form-container">
        <form onSubmit={registerUser}>
          <label>Name</label>
          <input type="text" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />

          <label>Email</label>
          <input type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />

          <label>Password</label>
          <input type="password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />

          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
