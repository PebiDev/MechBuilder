import { useSelector } from "react-redux";

const RemainingTons = () => {
  const mech = useSelector((state) => state.mech);
  return (
    <div className="remaining-tons">
      <p>
        Remaining Tons:
        <span id="tons-remaining"> {mech.remainingTons} </span>of {mech.tonnage}{" "}
        tons
        {mech.remainingTons < 0 && (
          <span className="overweight">
            <br />
            Mech is overweight!
          </span>
        )}
      </p>
    </div>
  );
};

export default RemainingTons;
