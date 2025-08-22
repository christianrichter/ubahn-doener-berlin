document.addEventListener('DOMContentLoaded', function() {
    const wrapper = document.getElementById('svg-wrapper');
    const container = document.getElementById('svg-container');
    const placeholder = document.getElementById('svg-placeholder');
    const tooltip = document.getElementById('tooltip');
    
    let scale = 1;
    let translateX = 0;
    let translateY = 0;
    let isDragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let svgElement = null;
    
    // Load and inline the SVG
    fetch('network.svg')
        .then(response => response.text())
        .then(svgContent => {
            // Remove XML declaration and add styling
            const cleanSvg = svgContent.replace(/^<\?xml.*?\?>\s*/, '').replace(/^<!--.*?-->\s*/, '');
            const styledSvg = cleanSvg.replace('<svg', '<svg style="display: block;"');
            
            // Insert the SVG
            wrapper.innerHTML = styledSvg;
            svgElement = wrapper.querySelector('svg');
            
            // Set up tooltip functionality for u1_1, u1_3, and u1_5 stations
            function setupTooltip(elementId, customTooltip = null, customDescription = null, customImage = null) {
                const element = svgElement.getElementById(elementId);
                if (element) {
                    element.addEventListener('mouseenter', function() {
                        const tooltipText = customTooltip;
                        const description = customDescription;
                        const imageUrl = customImage;
                        
                        tooltip.innerHTML = `<div style="display: flex; align-items: center; gap: 20px;">
                            <img src="${imageUrl}" alt="Döner" style="width: 100px; height: 100px; border-radius: 8px; object-fit: cover;">
                            <div>
                                <div style="font-weight: bold; font-size: 32px;">${tooltipText}</div>
                                <div style="font-size: 24px; opacity: 0.8;">${description}</div>
                            </div>
                        </div>`;
                        tooltip.style.display = 'block';
                    });
                    
                    element.addEventListener('mousemove', function(e) {
                        tooltip.style.left = (e.pageX + 5) + 'px';
                        tooltip.style.top = (e.pageY - 10) + 'px';
                    });
                    
                    element.addEventListener('mouseleave', function() {
                        tooltip.style.display = 'none';
                    });
                }
            }
            
            // Load data and setup tooltips for all stations
            Promise.all([
                fetch('pricing.json').then(response => response.json()),
                fetch('u1_elements.json').then(response => response.json())
            ]).then(([pricingData, elementsData]) => {
                // Setup tooltips for each station using data from JSON files
                Object.keys(pricingData).forEach(stationLabel => {
                    const elementId = elementsData[stationLabel];
                    const stationData = pricingData[stationLabel];
                    
                    if (elementId && stationData) {
                        setupTooltip(
                            elementId,
                            stationData.customTooltip,
                            stationData.customDescription,
                            stationData.customImage
                        );
                    }
                });
            }).catch(error => {
                console.error('Error loading tooltip data:', error);
            });
        })
        .catch(error => {
            console.error('Error loading SVG:', error);
            placeholder.innerHTML = 'Error loading map';
        });
    
    // Add zoom and pan functionality
    function updateTransform() {
        wrapper.style.transformOrigin = 'center center';
        wrapper.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    }
    
    // Mouse wheel zoom
    container.addEventListener('wheel', function(e) {
        e.preventDefault();
        const zoomSpeed = 0.2;
        
        if (e.deltaY < 0) {
            scale = Math.min(scale * (1 + zoomSpeed), 4);
        } else {
            scale = Math.max(scale * (1 - zoomSpeed), 0.25);
        }
        
        updateTransform();
    });
    
    // Mouse drag to pan
    container.addEventListener('mousedown', function(e) {
        if (e.button === 0) { // Left mouse button only
            e.preventDefault();
            isDragging = true;
            lastMouseX = e.clientX;
            lastMouseY = e.clientY;
            container.style.cursor = 'grabbing';
        }
    });
    
    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            const deltaX = e.clientX - lastMouseX;
            const deltaY = e.clientY - lastMouseY;
            translateX += deltaX;
            translateY += deltaY;
            lastMouseX = e.clientX;
            lastMouseY = e.clientY;
            updateTransform();
        }
    });
    
    document.addEventListener('mouseup', function() {
        if (isDragging) {
            isDragging = false;
            container.style.cursor = 'grab';
        }
    });
    
    // Add reset functionality (double click to reset zoom)
    container.addEventListener('dblclick', function() {
        scale = 1;
        translateX = 0;
        translateY = 0;
        updateTransform();
    });
    
    // Hide tooltip when mouse leaves container
    container.addEventListener('mouseleave', function() {
        tooltip.style.display = 'none';
    });
});