import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';

const {height, width} = Dimensions.get('window');
const cardWidth = width * 0.4;
const cardHeight = height * 0.4;
const cardsPerRow = 8;

function Card(props) {
  return (
    <TouchableOpacity
      onPress={() => props.onPress(props.x, props.y)}
      style={styles.card}>
      <Text style={styles.cardText}>{props.number}</Text>
    </TouchableOpacity>
  );
}

export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      currentX: 0,
      currentY: 0,
      selectedCard: null,
      cardsPerRow: 8,
      data: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        35,
        36,
        37,
        38,
        39,
        40,
      ],
    };
    this.xValue = new Animated.Value(7);
    this.yValue = new Animated.Value(4);
  }

  handleMove = (x, y) => {
    console.log('X: ', x);
    console.log('Y: ', y);
    this.move(8-x, 4-y);
  };

  move = (x, y) => {
    Animated.spring(this.xValue, {
      toValue: x,
      duration: 2000,
    }).start();
    Animated.spring(this.yValue, {
      toValue: y,
      duration: 2000,
    }).start();
  };

  renderRow = (row, i) => {
    var {cardsPerRow} = this.state;
    return (
      <View style={styles.row} key={i}>
        {row.map((card, index) => {
          return (
            <Card
              onPress={this.handleMove}
              number={cardsPerRow * i + index}
              y={i}
              x={index}
              key={index}
            />
          );
        })}
      </View>
    );
  };
  buildGrid = () => {
    let {cardsPerRow, data} = this.state;
    var rows = [];
    for (var i = 0; i < data.length; i += cardsPerRow) {
      var endSlice = i + cardsPerRow;
      var row = data.slice(i, endSlice);
      rows.push(row);
    }

    const top = this.yValue.interpolate({
      inputRange: [0, 4],
      outputRange: [-1 * (cardHeight * 3), 0],
    });
    const left = this.xValue.interpolate({
      inputRange: [0, cardsPerRow - 1],
      outputRange: [-1 * (cardsPerRow * cardWidth), 0],
    });

    return (
      <Animated.View style={[styles.gridContainer, {top, left}]}>
        {rows.map(this.renderRow)}
      </Animated.View>
    );
  };
  render() {
    return <View style={styles.parent}>{this.buildGrid()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gridContainer: {
    width: cardWidth * cardsPerRow,
    height: cardHeight * 3,
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 50,
  },
  row: {
    flexDirection: 'row',
  },
  card: {
    width: cardWidth,
    height: cardHeight,
    margin: 5,
    backgroundColor: '#eeeeee',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
