const DisplayMovement = ({ walkingMP, runningMP, jumpingMP }) => {
  return (
    <div id="movement">
      Movement:
      <table>
        <tbody>
          <tr>
            <td>Walking MP:</td>
            <td>{walkingMP}</td>
          </tr>
          <tr>
            <td>Running MP:</td>
            <td> {runningMP}</td>
          </tr>
          {jumpingMP > 0 && (
            <tr>
              <td>Jumping MP:</td>
              <td>{jumpingMP}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayMovement;
