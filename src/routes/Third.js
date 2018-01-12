// @flow
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { loadItems } from '../redux/Items';

const mapStateToProps = ({ items }) => ({ items });

@connect(mapStateToProps, { loadItems })
class Third extends Component<any> {
  componentDidMount() {
    if (this.props.items.items.length === 0 && !this.props.items.isLoading) {
      this.props.loadItems();
    }
  }

  render() {
    return (
      <Fragment>
        <p>This is the third page...</p>

        <p>
          This page is connected to the redux store, and the data below is loaded on mount from
          jsonplaceholder.typicode.com/posts using RxJs/redux-loadable.
        </p>

        <hr />

        {this.props.items.isLoading ? 'Loading...' : ''}

        {this.props.items.items.slice(0, 10).map(item => <Item item={item} key={item.id} />)}
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
