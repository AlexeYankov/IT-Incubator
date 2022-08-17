import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {action} from '@storybook/addon-actions';

import { TodolistInput } from '../components/todolistInput';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'AddItemForm/Input',
  component: TodolistInput,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    addNewTodolist: action('Button clicked')
  },
} as ComponentMeta<typeof TodolistInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TodolistInput> = (args) => <TodolistInput {...args} />;

export const TodolistInputStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TodolistInputStory.args = {
  addNewTodolist: action('Button says')
};


