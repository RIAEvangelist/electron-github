var AppFrame = React.createClass(
    {
        props:{
            title:'TEST'
        },
        render: function() {
            var css={
                app:{
                    height:'50%',
                    background:'rgb(240,240,240)',
                    boxShadow:'0 0 5px rgba(0,0,0,.7)'
                },
                body:{
                    height:'calc(100% - 40px)',
                    background:'rgb(240,240,240)'
                }
            }

            return (
                <app  className='panel' style={css.app}>
                    <header className='appFrame header gradient'>
                        <div className='appFrame-title'>{this.props.title}</div>
                        <AppFrameControls />
                    </header>
                    <section className='appFrame body' style={css.body}></section>
                </app>
            );
        }
    }
);

var AppFrameControls = React.createClass(
    {
        props:{

        },
        render: function() {
            return (
                <div className='appFrame-controls'>
                    <button>_</button>
                    <button>[=]</button>
                    <button>X</button>
                </div>
            );
        }
    }
);

React.render(
    <AppFrame />,
    document.querySelector('body')
);
