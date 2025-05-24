import RNPickerSelect from 'react-native-picker-select';

type Props = {
  onValueChange: (value: string) => void;
};

export const LanguageDropdown = ({onValueChange} : Props) => {
  return (
    <RNPickerSelect
      placeholder={{
        label: "Pick a language...",
        value: null,
      }}
      onValueChange={(value) => onValueChange(value)}
      items={[
        { label: 'English', value: 'eng' },
        { label: 'French', value: 'fre' },
        { label: "Swahili", value: 'swa' },
        { label: 'Portuguese', value: 'por' },
        { label: "Arabic", value: 'ara' },
        { label: "Chechewa", value: 'che' },
        { label: "Zulu", value: 'zul' },
      ]}
    />
  );
};

function valueChange(value: String) {
  console.log(value);
}