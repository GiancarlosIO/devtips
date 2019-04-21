/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-use-before-define */
import * as React from 'react';
import { withApollo, WithApolloClient } from 'react-apollo';
import Downshift from 'downshift';
import { Link, navigate } from '@reach/router';

// icons
import { Search as SearchIcon } from '@material-ui/icons';

// hooks
import useDebounce from 'src/utils/hooks/useDebounce';

import { styled } from 'src/theme';

import GET_TIPS_QUERY from './graphql/getTips.graphql';

const Container = styled.div`
  margin: 0 12px;
`;

const SearchWrapper = styled.div`
  position: relative;
`;

const InputWrapper = styled.div<{ focus: boolean }>`
  display: flex;
  align-items: center;
  width: 300px;
  border-width: 1px;
  border-style: solid;
  border-color: ${props =>
    props.focus ? props.theme.colors.lightblue : 'rgba(0, 0, 0, 0.1)'};
  border-radius: 12px;
  padding: 0 8px;

  input {
    width: 100%;
    height: 33px;
    outline: none;
    border: 1px solid transparent;
    font-size: 14px;
  }
`;

const Menu = styled.ul`
  margin: 0;
  padding: 4px 0 0 0;
  position: absolute;
  top: 100%;
  left: 0;
  width: 320px;
  background-color: #fff;
  max-height: 500px;
  overflow: auto;
  li {
    padding: 8px 4px;
  }
`;

type SearchProps = {};

type TipType = {
  originalId: number;
  url: string;
  title: string;
  description: string;
};

const Search: React.FC<WithApolloClient<SearchProps>> = ({ client }) => {
  const [focus, setFocus] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [tips, setTips] = React.useState<TipType[]>([]);
  const queryDebounced = useDebounce(query, 200);

  React.useEffect(() => {
    if (queryDebounced && queryDebounced.length > 0 && !loading) {
      getTips();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryDebounced]);

  const getTips = async () => {
    await setLoading(true);
    let result = [];

    try {
      result = await client.query<
        {
          tips: {
            edges: { node: TipType }[];
          };
        },
        { search: string }
      >({
        query: GET_TIPS_QUERY,
        variables: {
          search: query,
        },
      });
    } catch (error) {
      setLoading(false);
      setTips([]);
    }

    await setLoading(false);
    setTips(result.data.tips.edges.map(tip => tip.node));
  };

  const onChangeSelection = selection => {
    console.log(selection);
    console.log('selecting item');
    navigate(selection.url);
  };

  const onChange = e => setQuery(e.target.value);
  const onFocus = () => setFocus(true);
  const onBlur = () => setFocus(false);
  const onKeyDown = event => {
    if (event.key === 'Enter') {
      console.log('navigating to search page');
      navigate(`/search/?q=${query}`);
    }
  };

  return (
    <Container>
      <Downshift
        onChange={onChangeSelection}
        itemToString={item => (item ? item.title : '')}
        id="autocomplete-search"
        labelId="autocomplete-search-label"
        inputId="autocomplete-search-input"
        menuId="autocomplete-search-menu"
        inputValue={query}
        isOpen={!!query && query.length > 0 && focus}
      >
        {({
          getInputProps,
          getItemProps,
          // getLabelProps,
          getMenuProps,
          getRootProps,
          setHighlightedIndex,
          isOpen,
          // inputValue,
          highlightedIndex,
          selectedItem,
        }) => (
          <SearchWrapper {...getRootProps()}>
            {/* <label {...getLabelProps()}>Search a tip</label> */}
            <InputWrapper focus={focus}>
              <SearchIcon className="icon" />
              <input
                {...getInputProps({
                  onFocus,
                  onBlur,
                  onChange,
                  onKeyDown:
                    highlightedIndex !== 0 && !highlightedIndex
                      ? onKeyDown
                      : () => {},
                })}
                placeholder="Search a tip!"
              />
            </InputWrapper>
            <Menu
              {...getMenuProps({
                onMouseLeave: () => setHighlightedIndex(null),
              })}
            >
              {isOpen
                ? tips.map((tip, index) => (
                    <li
                      {...getItemProps({
                        key: tip.title,
                        index,
                        item: tip,
                        style: {
                          backgroundColor:
                            highlightedIndex === index ? 'lightgrey' : 'white',
                          fontWeight: selectedItem === tip ? 'bold' : 'normal',
                        },
                      })}
                    >
                      <Link to={tip.url}>{tip.title}</Link>
                    </li>
                  ))
                : null}
            </Menu>
          </SearchWrapper>
        )}
      </Downshift>
    </Container>
  );
};

export default withApollo(Search);
