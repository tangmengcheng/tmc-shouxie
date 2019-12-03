/**
 * 题目具体描述如下：
给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。
 * @param {*} nums 
 * @param {*} target 
 */
var twoSum = function(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[j] == target - nums[i]) {
                console.log([i,j])
                return [i,j]
                break;
            }
        }
    }
};
twoSum([2,11,15,3,6,7], 9)