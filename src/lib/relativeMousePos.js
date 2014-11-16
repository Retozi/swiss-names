module.exports = function(e) {
    var mouseX = e.clientX || e.touches[0].clientX;
    var mouseY = e.clientY || e.touches[0].clientY;
    console.log(e.currentTarget.parentNode);
    var rect = e.currentTarget.getBoundingClientRect();
    var left = mouseX - rect.left;
    var top = mouseY - rect.top;
    return {
        leftPx: left,
        topPx: top,
        leftPercent: left / rect.width,
        topPercent: top / rect.height
    };
};
