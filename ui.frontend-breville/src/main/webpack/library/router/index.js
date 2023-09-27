class Router {

  constructor() {
    if ( !Router.instance ){
      Router.instance = this;
      this.router = {};
    }
    return Router.instance;
  }

  set setRouter( instance ) {
    this.router = instance;
  }

  push( url ){
    // NOTE: do something before routing or trigger analytics event
    this.router.push( url );
  }

  replace( path, state ){
    this.router.replace( path, state );
  }

}
const instance = new Router();
window.Router = instance;
export default instance;