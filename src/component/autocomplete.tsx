import React, { ChangeEvent } from 'react'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

type OptionItemType = {
    name: string
};

interface FormSelectInterface {
    stateChange?: (value: string) => void,
    optionLabel: string,
    options: OptionItemType[],
    disabled?: boolean,
    filterKey: string
}

function FormAutocomplete({ optionLabel, options, stateChange, disabled, filterKey }: FormSelectInterface) {
    // const defaultOptionsValue = options.filter((item) => {
    //     return item.name === filterKey
    // })
    // console.log(defaultOptionsValue)
    const [inputValue, setInputValue] = React.useState<OptionItemType[]>([{ name: filterKey }]);
    const handleChange = (e: React.ChangeEvent<EventTarget>, v: OptionItemType | null
    ) => {
        setInputValue([{ name: v?.name || '' }])
        stateChange!(v?.name || '')
    }
    // const defaultValue = React.useMemo(() => options.filter((item) => {
    //     return item.name === filterKey
    // }), [options])
    React.useEffect(() => {
        const defaultValue = options.filter((item) => {
            return item.name === filterKey
        })
        setInputValue(defaultValue)
    }, [])

    return (
        <Autocomplete
            id="country-select-demo"
            disabled={disabled}
            value={inputValue[0]}
            inputValue={filterKey}
            sx={{ minWidth: 200 }}
            autoHighlight
            options={options}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, val) => {
                return option.name === val?.name || val?.name === ''
            }}
            onChange={handleChange}
            renderOption={(props, option) => (
                <Box {...props} component="li" key={option.name}>
                    {option.name}
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={optionLabel}
                    inputProps={{
                        ...params.inputProps,
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                >
                </TextField>
            )}
        />
    )
}

export default FormAutocomplete
