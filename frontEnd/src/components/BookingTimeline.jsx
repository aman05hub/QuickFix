import React from "react";
import "../styles/BookingTimeline.css";

const BookingTimeline = ({ status, paymentStatus }) => {

    const steps = ["pending","accepted","paid","on the way","completed"];

    const getCurrentStep = () => {

        if(status === "pending") return 0;

        if(status === "accepted" && paymentStatus === "unpaid") return 1;

        if(status === "accepted" && paymentStatus === "paid") return 2;

        if(status === "on the way") return 3;

        if(status === "completed") return 4;

        return 0;
    }

    const currentStep = getCurrentStep();

    const progressWidth = (currentStep / (steps.length - 1)) * 100;

    return(

        <div className="timeline">

            <div className="timeline-line"></div>

            <div className="timeline-prgress" style={{ width: `${progressWidth}%` }}></div>

            <div className="timeline-steps">

                {steps.map((step,index) => (

                    <div 
                    key={index} 
                    className={`timeline-step ${
                        index <= currentStep ? "active" : ""
                    }`}>

                        <div className="circle"></div>
                        <span>{step}</span>
                    </div>
                    ))}
            </div>
        </div>
    )
}

export default BookingTimeline;