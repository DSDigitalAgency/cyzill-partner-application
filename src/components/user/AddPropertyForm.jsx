import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Description from './addproperty/Description';
import Media from './addproperty/Media';
import Location from './addproperty/Location';
import Details from './addproperty/Details';
import Payment from './addproperty/Payment';

const AddPropertyForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    description: '',
    media: [],
    location: '',
    detail: '',
    payment: [],
  });

  const isStepCompleted = () => {
    switch (step) {
      // Adjust the conditions based on your validation logic for each step
      case 1:
        return (
          formData.description.trim() !== '' &&
          formData.media.length > 0 &&
          formData.location.lat !== '' &&
          formData.location.lng !== ''
        );
      case 2:
        return formData.media && formData.media.length > 0;
      // Add similar cases for other steps

      default:
        return true;
    }
  };

  const dispatch = useDispatch();

  const nextStep = () => {
    const nextStepNumber = step + 1;
    if (nextStepNumber <= Object.keys(steps).length) {
      setStep(nextStepNumber);
    }
  };

  const previousStep = () => {
    setStep(step - 1);
  };

  const saveFormData = (data) => {
    setFormData((prevData) => ({
      ...prevData,
      ...data,
      location: {
        ...prevData.location,
        ...data.location,
      },
    }));
    console.log(formData);
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const stepInfo = steps[step];

  if (!stepInfo) {
    return <Text>Error: Step information is missing.</Text>;
  }
  const { component: StepComponent } = stepInfo;

  const isLastStep = step === Object.keys(steps).length;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.steps}>
        {/* Rendering steps */}
      </View>

      <StepComponent formData={formData} setFormData={saveFormData} saveFormData={saveFormData} />

      <View style={styles.buttonContainer}>
        {step !== 1 && (
          <TouchableOpacity onPress={previousStep} style={styles.button}>
            <Text style={styles.buttonText}>Previous</Text>
          </TouchableOpacity>
        )}

        {!isLastStep && (
          <TouchableOpacity onPress={nextStep} style={[styles.button, isStepCompleted() ? {} : styles.disabledButton]}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  steps: {
    flexDirection: 'row',
    // Add styling for steps
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  disabledButton: {
    backgroundColor: 'gray',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AddPropertyForm;

