export default class ErrorView {
    static render() {
        window.scrollTo({
            top: 0,
        });
        return `
            <div class="error">
            <div class="container-error">
            <div class="error">
                
                
               <h3 class='error-title'>Something went wrong</h3>
                    <p>Please try again</p>
            </div>
            <div class="stack-container-error">
                <div class="card-container-error">
                    <div class="perspec" style="--spreaddist: 125px; --scaledist: .75; --vertdist: -25px;">
                        <div class="card-error">
                            <div class="writing">
                                <div class="topbar">
                                    <div class="red"></div>
                                    <div class="yellow"></div>
                                    <div class="green"></div>
                                </div>
                                <div class="code">
                                    <ul>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              
                                <div class="code">
                                    <ul>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                           
                        </div>
               
    
        </div>
            </div>
        `;
    }
}
