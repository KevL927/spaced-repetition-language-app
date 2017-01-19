export default res => {
    return res.status(401).json({
        message: 'Internal Server Error'
    });
};