import React from 'react';
import Card from '../../Components/Card/Card';

const Client = () => {
    return (
       <div >
          <div
             className="mt-5 p-4"
             style={{
                backgroundColor: "#f8f9fa",
             }}
          >
             <h1 size="md">CLIENT PAGE</h1>
          </div>
          <div className='mt-5' >
            <Card></Card>
          </div>
       </div>
    );
};

export default Client;