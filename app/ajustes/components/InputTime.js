import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {zeroLeft} from '../../utils';

export default class InputTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 7,
    };
  }

  componentDidMount() {
    if (this.props.defaultTime) {
      this.setState({
        time: this.props.defaultTime || 0,
      });
    }
  }

  onMinusPress() {
    var {time} = this.state;
    if (time > 0) {
      var newTime = time - 1;
      this.setState({
        time: newTime,
      });
      this.props.onChange(newTime);
    } else {
      console.log('sdasdasd');
    }
  }

  onPlusPress() {
    var {time} = this.state;
    if (time < 23) {
      var newTime = time + 1;
      this.setState({
        time: newTime,
      });
      this.props.onChange(newTime);
    } else {
      console.log('sdasdasd');
    }
  }

  render() {
    const {time} = this.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.onMinusPress()}>
          <Icon name="minus" color="#000" size={25} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          editable={false}
          value={zeroLeft(time) + ':00'}
        />
        <TouchableOpacity onPress={() => this.onPlusPress()}>
          <Icon name="plus" color="#000" size={25} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    color: '#000',
    width: 60,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
