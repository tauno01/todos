import * as React from 'react';
import { Appbar } from 'react-native-paper';

const MyAppbar = () => (
  <Appbar.Header>
    <Appbar.BackAction onPress={() => {}} />
    <Appbar.Content title="Todo list" />
  </Appbar.Header>
);

export default MyAppbar;