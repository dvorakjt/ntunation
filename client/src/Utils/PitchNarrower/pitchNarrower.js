module.exports = (pitches, nadir, zenith) => {
    //get the index of the nadir and zenith
    let nIndex, zIndex;
    pitches.forEach((pitch, index) => {
        if (pitch.dispName === nadir) nIndex = index;
        else if (pitch.dispName === zenith) zIndex = index;
    });
    // increase the zIndex by 1 so it can be used in .slice
    zIndex++;
    //return a new array which is a subset of all the pitches
    return pitches.slice(nIndex, zIndex);
}