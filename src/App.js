import logo from './logo.svg';
import './App.css';
import LeaveTable from './component/leaveTable';
import AddEditLeave from './component/addEditLeave';
import { useState } from 'react';

function App() {
  const [addLeave, setAddLeave] = useState(false);
  return (
    <div className="App">
      <button
        style={{
          backgroundColor: 'black',
          width: '200px',
          height: '50px',
          color: 'white',
          fontSize: '20px',
          borderRadius: '5px',
          border: 'none',
          cursor: 'pointer',
          marginBottom: '20px',
          padding: '2px',
        }
      }
      className="add-leave-button"
        onClick={() => {
          console.log('Add Leave');
          setAddLeave(true);
        }}>Add A Leave</button>
      {
        addLeave ?
          <AddEditLeave /> :
          < LeaveTable />
      }
    </div >
  );
}

export default App;
