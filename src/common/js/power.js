import {findPower } from '../../api/api';

export default {
    getPower: function (that) {
        let currentModulePath = that.$route.fullPath;
        currentModulePath = currentModulePath.replace(/add/g,"list");

        findPower({
            currentModulePath: currentModulePath
        }).then((res) => {
            that.admin = false;
            that.add = false;
            that.del = false;
            that.sele = false;
            that.upda = false;

            if (res.code == 200) {
                res.data.forEach((x) => {
                    if (x == '16') {
                        that.admin = true;
                    }
                    if (x == '8') {
                        that.add = true;
                    }
                    if (x == '4') {
                        that.del = true;
                    }
                    if (x == '2') {
                        that.sele = true;
                    }
                    if (x == '1') {
                        that.upda = true;
                    }
                });
            } else {
                that.$message.error(res.msg);
            }
        })
    }
};