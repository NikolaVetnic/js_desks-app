import "./BoxContainer.css";

const NarrowContainer = ({ children }) => {
    return (
        <div className="px-md-5 my-5">
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="box-container p-4">{children}</div>
                </div>
            </div>
        </div>
    );
};

export default NarrowContainer;
