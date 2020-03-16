import React from 'react';
import { connect } from 'dva';
import styles from './index.css';

class IndexPage extends React.Component {
  render() {
    const { dispatch, count } = this.props;

    return (
      <div className={styles.normal}>
        <div className={styles.record}>
          {/*将count的record输出*/}
          Highest Record: {count.record}
        </div>

        <div className={styles.current}>
          {count.current}
        </div>

        <div className={styles.button}>
          <button
            onClick={
              () => {
                dispatch({ type: 'count/add' });
              }
            }
          >
            +
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { count: state.count };
} // 获取state

export default connect(mapStateToProps)(IndexPage);