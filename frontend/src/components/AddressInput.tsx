import styles from '@/styles/numberInput.module.css';
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import React, { useRef, useState } from "react";

const libraries: ("places")[] = ["places"];

interface AddressInputProps {
  onAddressChange: (address: string) => void;
}

const AddressInput = ({ onAddressChange }: AddressInputProps) => {
  const [address, setAddress] = useState<string>(""); // React's state for the input value
  const [error, setError] = useState<string | null>(null); // For error handling
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });

  if (loadError) return <div>Error loading Google Maps API</div>;
  if (!isLoaded) return <div>Loading...</div>;

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current?.getPlace();
    console.log("Google Place Object:", place); // Debugging

    if (place) {
      const formattedAddress = place.formatted_address || "";
      const addressComponents = place.address_components || [];
      const state = addressComponents.find((component) =>
        component.types.includes("administrative_area_level_1")
      )?.short_name;

      // Ensure the address is in Colorado (example validation)
      if (state === "CO") {
        setAddress(formattedAddress);
        onAddressChange(formattedAddress); // Pass the address to parent
        setError(null);
      } else {
        setAddress("");
        onAddressChange("");
        setError("Please select an address in Colorado.");
      }
    } else {
      setAddress("");
      onAddressChange("");
      setError("Unable to retrieve address. Please try again.");
    }
  };

  const handleManualInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setAddress(inputValue);
    onAddressChange(inputValue);
    setError(null); // Clear errors when user types manually
  };

  return (
    <div className={styles.numberInputWrapper}>
      <Autocomplete
        onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
        onPlaceChanged={handlePlaceChanged}
        options={{
          componentRestrictions: { country: "us" },
        }}
      >
        <input
          type="text"
          placeholder="Enter address"
          value={address} // Bind to the current state
          onChange={handleManualInput} // Handle manual input
          className={styles.addressInput}
          style={{
            width: "100%",
            padding: "18px",
            fontSize: "20px",
            border: error ? "1px solid red" : "1px solid rgba(147, 113, 3, 0.782)",
            borderRadius: "4px",
            backgroundColor: "#121212",
            color: "#e0c097",
          }}
        />
      </Autocomplete>
      <p style={{ color: error ? "red" : "#e0c097", fontSize: "14px" }}>
        {error || (address ? `Selected Address: ${address}` : "No address selected")}
      </p>
      {address && (
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#007BFF", textDecoration: "underline", cursor: "pointer" }}
        >
          View on Google Maps
        </a>
      )}
    </div>
  );
};

export default AddressInput;
