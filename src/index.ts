import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ICommandPalette } from '@jupyterlab/apputils';

import { ILauncher } from '@jupyterlab/launcher';

import { ITranslator } from '@jupyterlab/translation';

import { ExamplePanel } from './panel';

/**
 * The command IDs used by the console plugin.
 */
namespace CommandIDs {
  export const create = 'custom-kernel:create';
}

/**
 * Initialization data for the extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: '@jupyterlab-examples/kernel-custom-ext-issue:plugin',
  description: 'JupyterLab extension example for kernel selection.',
  autoStart: true,
  optional: [ILauncher],
  requires: [ICommandPalette, ITranslator],
  activate: activate
};

/**
 * Activate the JupyterLab extension.
 *
 * @param app Jupyter Front End
 * @param palette Jupyter Commands Palette
 * @param translator Jupyter Translator
 * @param launcher [optional] Jupyter Launcher
 */
function activate(
  app: JupyterFrontEnd,
  palette: ICommandPalette,
  translator: ITranslator,
  launcher: ILauncher | null
): void {
  const manager = app.serviceManager;
  const { commands } = app;
  const category = 'Custom kernels';
  const trans = translator.load('jupyterlab');

  // Add launcher
  if (launcher) {
    launcher.add({
      command: CommandIDs.create,
      category: category
    });
  }

 
  // add commands to registry
  commands.addCommand(CommandIDs.create, {
    label: trans.__('Customise kernels'),
    caption: trans.__('Customise kernels'),
    execute: ()=>{
      new ExamplePanel(manager, translator);
    }
  });

  // add items in command palette and menu
  palette.addItem({ command: CommandIDs.create, category });
}

export default extension;