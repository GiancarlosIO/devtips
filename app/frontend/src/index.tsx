import * as React from 'react';
import ReactDOM from 'react-dom';

interface Props {
  name: string;
}
const HelloWord: React.FunctionComponent<Props> = ({
  name,
}): React.ReactElement => (
  <div>
    {Array.from({ length: 10 }).map(() => (
      <h2>{name}</h2>
    ))}
  </div>
);

ReactDOM.render(<HelloWord name="Gian" />, document.querySelector('#app'));
