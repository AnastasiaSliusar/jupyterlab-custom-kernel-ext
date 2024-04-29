import {
    SessionContext,
    ISessionContext,
    SessionContextDialogs
  } from '@jupyterlab/apputils';
  
  import { ServiceManager } from '@jupyterlab/services';

  import {
    ITranslator,
  } from '@jupyterlab/translation';
  

  import { Message } from '@lumino/messaging';

  
  /**
   * The class name added to the panels.
   */
  
  /**
   * A panel which has the ability to add other children.
   */
  export class ExamplePanel {
    constructor(manager: ServiceManager.IManager, translator?: ITranslator) {
      //
      console.log('kernelspecs');
  console.log(`kernelspecs-->${manager.kernelspecs}`);

      this._sessionContext = new SessionContext({
        sessionManager: manager.sessions,
        specsManager: manager.kernelspecs,
        name: 'Select Kernels'
      });
  
  
      this._sessionContextDialogs = new SessionContextDialogs({
        translator: translator
      });
  
      void this._sessionContext
        .initialize()
        .then(async value => {
          if (value) {
            await this._sessionContextDialogs.selectKernel(this._sessionContext);
          }
        })
        .catch(reason => {
          console.error(
            `Failed to initialize the session in ExamplePanel.\n${reason}`
          );
        });
    }

    get session(): ISessionContext {
      return this._sessionContext;
    }
  
    dispose(): void {
      this._sessionContext.dispose();
    }
  
    protected onCloseRequest(msg: Message): void {
      this.dispose();
    }
  
    private _sessionContext: SessionContext;
    private _sessionContextDialogs: SessionContextDialogs;
  }