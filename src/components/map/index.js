import { Component } from 'preact';

import constants from '../../constants';

class Map extends Component {

    constructor(props) {
        super(props);

        this.state = {
            image: {
                zoomLevel: 100,
                x: 0,
                y: 0,
                tempX: 0,
                tempY: 0,
                isDragging: false,
                dragStartX: 0,
                dragStartY: 0,
                
            }
        }

        this.onZoom = this.onZoom.bind(this);
    }


    updateDragState(eventX, eventY) {
        return {
            x: (eventX - this.state.image.dragStartX), 
            y: (eventY - this.state.image.dragStartY)
        };

    }


    onZoom(event) {
        const direction = Math.sign(event.deltaY) < 0 ? constants.ZOOM_DIRECTIONS.IN : constants.ZOOM_DIRECTIONS.OUT;
        const newZoom = direction === constants.ZOOM_DIRECTIONS.IN ? this.state.image.zoomLevel * constants.ZOOM_STEP : this.state.image.zoomLevel / constants.ZOOM_STEP;
        this.setState({
            image: {
                ...this.state.image,
                zoomLevel: newZoom
            }
        })
    }

    onDragStart(event) {
        this.setState({ 
            image: {
                ...this.state.image,
                dragStartX: event.clientX,
                dragStartY: event.clientY,
                isDragging: true,
            }
        });
    }


    onDragEnd(event) {
        const updatedCoords = this.updateDragState(event.clientX, event.clientY);
        this.setState({ 
            image: {
                ...this.state.image,
                x: this.state.image.x - updatedCoords.x,
                y: this.state.image.y - updatedCoords.y,
                tempX: this.state.image.x - updatedCoords.x,
                tempY: this.state.image.y - updatedCoords.y,
                isDragging: false,
            }
        });
    }
    
    onDrag(event) {
        if(this.state.image.isDragging) {
            const updatedCoords = this.updateDragState(event.clientX, event.clientY);
            this.setState({
                image: { 
                    ...this.state.image,
                    tempX: this.state.image.x - updatedCoords.x,
                    tempY: this.state.image.y - updatedCoords.y,
                }
            })
        }
    }


    render() {
        const imageStyles = {
            width: `${parseInt(this.state.image.zoomLevel, 10)}%`, 
            height: `${parseInt(this.state.image.zoomLevel, 10)}%`,
            top: `${this.state.image.isDragging ? this.state.image.tempY : this.state.image.y}px`,
            left: `${this.state.image.isDragging ? this.state.image.tempX : this.state.image.x}px`,
        }
        
        return (
            <div className={'map-wrapper'}
                onWheel={(event) => this.onZoom(event)}
                onMouseDown={(event) => this.onDragStart(event)}
                onMouseMove={(event) => this.onDrag(event)}
                onMouseUp={(event) => this.onDragEnd(event)}
            >
                <div id="map-image" draggable={false} style={imageStyles} />
            </div>
        );
    }
}

export default Map;