/* eslint-disable react/prop-types */
const FeedbackCard = ({ feedback }) => {
    return (
        <div className="card feedback-card mx-3 mt-3">
            <div className="card-body">
                <table className="table">
                    <tbody>
                        <tr>
                            <th scope="row">District</th>
                            <td>{feedback.district}</td>
                        </tr>
                        <tr>
                            <th scope="row">Address</th>
                            <td>{feedback.address}</td>
                        </tr>
                        <tr>
                            <th scope="row">Description</th>
                            <td>{feedback.description}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default FeedbackCard;
