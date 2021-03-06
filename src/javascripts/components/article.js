// src/javascripts/components/article.js
import React, { Component } from 'react';
import { isEqual } from 'lodash';

class Article extends Component {
  constructor(props) {
    super(props);
    this.text = React.createRef();
  }

  componentDidMount() {
    const { loadArticle, match: { params: { name, y, m, d } } } = this.props;
    setTimeout(() => loadArticle(`${name}/${y}/${m}/${d}`), 300);
  }

  componentWillReceiveProps(nextProps) {
    const { loadArticle, match: { params: { name, y, m, d } }, article: { status } } = nextProps;
    if (!isEqual(this.props.match, nextProps.match)) {
      setTimeout(() => loadArticle(`${name}/${y}/${m}/${d}`), 300);
      NProgress.set(Math.random());
    }
    if (status === 'succeeded') setTimeout(() => NProgress.done(), 500);
  }

  createInput({ target }) {
    if ( !['editing', 'original', 'translation'].includes(target.className) && !/^\s*$/.test(target.textContent) ) {
      const div = document.createElement('div');
      const input = document.createElement('input');
      target.className = 'original';
      div.className = 'editing';
      input.className = 'translation';
      div.append(input);
      target.replaceWith(div);
      input.parentNode.insertBefore(target, input);
    }
  }

  render() {
    const { article: { data: { title, content } } } = this.props;
    return (
      <div className='article'>
        <div>
          <h3>{title}</h3>
          <div className='text' ref={this.text} onClick={this.createInput} dangerouslySetInnerHTML={{ __html: content }} ></div>
        </div>
      </div>
    );
  }
}

export default Article;