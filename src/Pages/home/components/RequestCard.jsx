import React from "react";
import { useTranslation } from "react-i18next";

const RequestCard = ({ requests, onAccept, onDecline }) => {
    const { t } = useTranslation("home");

    return (
        <div className="request-card">
            <div className="request-user">
                <img src={requests.image} alt="" className="request-avatar" />

                <div>
                    <h6>{requests.name}</h6>

                    <span>@{requests.username}</span>
                </div>
            </div>

            {/* Actions */}

            <div className="request-actions">
                <button
                    className="
        accept-btn
    "
                    onClick={() => onAccept(requests.id)}
                >
                    {t("accept")}
                </button>

                <button
                    className="
        decline-btn btn btn-danger
    "
                    onClick={() => onDecline(requests.id)}
                >
                    {t("cancel")}
                </button>
            </div>
        </div>
    );
};

export default RequestCard;
