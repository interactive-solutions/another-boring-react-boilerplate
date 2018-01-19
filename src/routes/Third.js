// @flow
import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

import { loadItems, increaseMaxItems, toggleLoading, getItems, getLoading } from '../redux/Items';

import Button from '../components/Button';

const mapStateToProps = ({ items }) => ({
  items: getItems(items),
  isLoading: getLoading(items),
});

@connect(mapStateToProps, { loadItems, increaseMaxItems, toggleLoading })
class Third extends Component<any> {
  componentDidMount() {
    if (this.props.items.length === 0 && !this.props.isLoading) {
      this.props.loadItems();
    }
  }

  handleIncreaseBtnClick = () => {
    this.props.increaseMaxItems();
  };

  handleLoadBtnClick = () => {
    this.props.toggleLoading();
  };

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Third</title>
        </Helmet>

        <p>This is the third page...</p>

        <p>
          This page is connected to the redux store, and the data below is loaded on mount from
          jsonplaceholder.typicode.com/posts using RxJs/redux-loadable.
        </p>

        <p>
          Items in the list are cached with Reselect, which means the &#34;heavy&#34; array slicing
          that is going on in getItems() doesn&#39;t need to be done as long as the return values of
          getStateItems() and getStateMaxItems() remains the same. If a vanilla (non-reselect)
          selector had been used, we would have to slice the array everytime the state changed (e.g.
          when the &#34;Toggle loading&#34; button is clicked).
        </p>

        <hr />

        {this.props.isLoading ? 'Loading...' : ''}

        {this.props.items.map(item => <Item item={item} key={item.id} />)}

        <p>
          <Button onClick={this.handleIncreaseBtnClick} text="Increase items" />
        </p>
        <p>
          <Button onClick={this.handleLoadBtnClick} text="Toggle loading" />
        </p>
      </Fragment>
    );
  }
}

const Item = ({ item }: { item: { title: string, body: string } }) => (
  <div>
    <h3>{item.title}</h3>
    {item.body}
  </div>
);

export default Third;
