import * as React from 'react';
import {BaseSyntheticEvent} from 'react';
import {alpha, styled} from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';


const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));


export class SearchInput extends React.Component<{ onSearchChange: (text: string) => void }, { searchValue: string }> {
    constructor(props: any) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            searchValue: ''
        }
    }

    private handleChange(event: BaseSyntheticEvent): void {
        this.setState({searchValue: event.target.value});
        this.props.onSearchChange(event.target.value);
    }

    render() {
        return <Search sx={{maxWidth: 300}}>
            <SearchIconWrapper>
                <SearchIcon/>
            </SearchIconWrapper>
            <StyledInputBase
                value={this.state.searchValue}
                onChange={this.handleChange}
                placeholder="Entrez 3 caractère minimum.."
                inputProps={{'aria-label': 'search'}}
            />
        </Search>
    }
}