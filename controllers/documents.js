import Documents from "../model/docModel.js";
import User from "../model/userModel.js";
import { Op } from "sequelize";
export const getDocuments = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Documents.findAll({
        attributes: ["uuid", "name", "author"],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const getDocumentById = async (req, res) => {
  try {
    const document = await Documents.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!document) return res.status(404).json({ msg: "Data not found" });
    let response;
    response = await Documents.findOne({
      attributes: ["uuid", "name", "author", "description", "link"],
      where: {
        id: document.id,
      },
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const getDocumentByType = async (req, res) => {
  try {
    let response;
    response = await Documents.findAll({
      attributes: ["uuid", "name", "author", "description", "link"],
      where: {
        type: req.params.type,
      },
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const getDocumentBySubject = async (req, res) => {
  try {
    let response;
    response = await Documents.findAll({
      attributes: ["uuid", "name", "author", "description", "link"],
      where: {
        subject: req.params.subject,
      },
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export let createDocument = async (req, res) => {
  const { name, author, type, subject, description, link } = req.body;
  try {
    await Documents.create({
      name: name,
      author: author,
      type: type,
      subject: subject,
      description: description,
      link: link,
    });
    res.status(201).json({ msg: "Document Created Successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export let updateDocument = async (req, res) => {
  try {
    const document = await Documents.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!document) return res.status(404).json({ msg: "Data not found" });
    const { name, author, type, subject, description, link } = req.body;
    if (req.role === "admin") {
      await Documents.update(
        { name, author, type, subject, description, link },
        {
          where: {
            id: document.id,
          },
        }
      );
    }
    res.status(200).json({ msg: "document updated successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export let deleteDocument = async (req, res) => {
  try {
    const document = await Documents.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!document) return res.status(404).json({ msg: "Data not found" });

    if (req.role === "admin") {
      await document.destroy({
        where: {
          id: document.id,
        },
      });
    }
    res.status(200).json({ msg: "document deleted successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// module.exports = {
//     getdocument, getdocumentById, createdocument, updatedocument, deletedocument
// }
