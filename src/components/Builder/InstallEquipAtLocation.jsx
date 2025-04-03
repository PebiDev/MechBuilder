const InstallEquipAtLocation = (equip, onChange) => {
  const locations = [];

  return (
    <select name="equip-location-select" id={equip.id} onChange={onChange}>
      {locations.map((location) => {
        return (
          <option key={location} value={location}>
            {location}
          </option>
        );
      })}
    </select>
  );
};

export default InstallEquipAtLocation;
