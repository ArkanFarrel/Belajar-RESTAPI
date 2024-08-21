import db from "../database.js";

 export const getMahasiswa = (req,res) => {
    const sql = "SELECT * FROM mahasiswa"
    db.query(sql, (error, result) => {
        res.send(result)
    });
};

export const getMahasiswaByNim = (req,res) => {
    //menangkap data query url
    const nim = req.query.nim;
    //menangkap semua data dari table mahasiswa berdasarkan nim
    const sql = `SELECT * FROM mahasiswa WHERE nim = ${nim}`;
    //mengirim query ke database mysql
    db.query(sql, (error, result) => {
        //ngirim data hasil ke client browser
        res.json(result);
    });
};

export const createMahasiswa = (req,res) => {
    const { nim, nama_lengkap, kelas, alamat} = req.body;
    const sql = "INSERT INTO MAHASISWA (nim, nama_lengkap, kelas, alamat) VALUES (?,?,?,?)";
    db.query(sql, [nim, nama_lengkap, kelas, alamat], (error, result) => {
        if (error) {
            res.status(400);
            res.send(error);
        }
        res.status(201);
        res.json(result);
    });
};

export const updateMahasiswa = (req, res) => {
    const nim = req.query.nim;
    const {nama_lengkap, kelas, alamat} = req.body
    if(nim || nama_lengkap, kelas, alamat){
        const query = `UPDATE mahasiswa SET nama_lengkap = "${nama_lengkap}", kelas = "${kelas}", alamat = "${alamat}" WHERE nim = ${nim} `;
        db.query(query, (error, result) => {
            if(error) res.status(400).send(error,message)
                res.json(result)
        })
    } else {
        res.send("isi body nya")
    }
}

export const deleteMahasiswa = (req, res) => {
    const nim = req.query.nim
    const sql = "DELETE FROM mahasiswa WHERE nim = ?"
    db.query(sql, [nim], (error, result) => {
        if(error){
            res.status(400)
            res.send(error)
        }
        res.status(200)
        res.json("Data berhasil di hapus")
    })
}