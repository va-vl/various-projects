// TODO: canvas view implementation
import { Field } from './models';
import { View } from './views';

// Init
const root = document.getElementById('root') as HTMLDivElement;
View.init(root, new Field(20, 20));
