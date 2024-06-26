import React from "react";

const ContentDetails = ({ item }) => {
    console.log("item", item);

    return (
        <>
            <tr className="align-middle text-dark">
                <th className="p-6" scope="row">
                    {item?.user?.firstname} {item?.user?.lastname}
                </th>
                <td className="p-6">{item?.title}</td>
                <td className="p-6">{item?.description}</td>
                <td className="p-6">{item?.amount}</td>
                <td className="p-6">{item?.createdAt}</td>
                <td className="p-6">
                    <button className="nadge bg-success-light text-success">
                        <svg xmins="https://www/w3/org/2000/svg"
                            width="16"
                            height="16"
                            fill="curreneColor"
                            class="bi bi-pencil-square"
                            viewBox="0 0 16 16"
                        >
                        </svg>
                    </button>
                </td>
            </tr>
        </>
    )
}


export default ContentDetails;