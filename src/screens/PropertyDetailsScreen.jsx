import React from 'react';
import { useRoute } from '@react-navigation/native'; // Import useRoute from @react-navigation/native
import PropertyDetails from '../components/common/PropertyDetails';

const PropertyDetailsScreen = () => {
  const route = useRoute(); // Use useRoute to get the route object

  return (
    <PropertyDetails route={route} />
  );
};

export default PropertyDetailsScreen;
