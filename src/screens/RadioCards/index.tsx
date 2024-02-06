/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Button} from 'react-native';

interface RadioCardProps {
  title: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}

const RadioCard: React.FC<RadioCardProps> = ({
  title,
  description,
  checked,
  onChange,
}) => {
  return (
    <TouchableOpacity onPress={onChange}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{marginRight: 8}}>
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#000',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {checked && (
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: '#000',
                }}
              />
            )}
          </View>
        </View>
        <View>
          <Text style={{fontSize: 18}}>{title}</Text>
          <Text>{description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

interface RadioCardData {
  title: string;
  description: string;
}

const radioCardsData: RadioCardData[] = [
  {
    title: 'Option 1',
    description: 'Description for Option 1',
  },
  {
    title: 'Option 2',
    description: 'Description for Option 2',
  },
  {
    title: 'Option 3',
    description: 'Description for Option 3',
  },
];

const RadioCardGroup: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleRadioChange = (index: number) => {
    setSelectedOption(index === selectedOption ? null : index);
  };

  return (
    <View>
      {radioCardsData.map((card, index) => (
        <RadioCard
          key={index}
          title={card.title}
          description={card.description}
          checked={index === selectedOption}
          onChange={() => handleRadioChange(index)}
        />
      ))}
      <View style={{marginTop: 20}}>
        <Button
          title="Submit"
          disabled={selectedOption === null}
          onPress={() => console.log('Submit button clicked')}
        />
      </View>
    </View>
  );
};

export default RadioCardGroup;
