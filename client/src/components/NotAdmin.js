import React from "react";


const NotAdmin = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexdirection: "column",
                margin: "20px",
            }}
        >
            <h1 className="text-danger">You are not an admin</h1>
        </div>
    );
};

export default NotAdmin;