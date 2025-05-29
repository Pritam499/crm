import accountService from "../../services/account/accountService.js";
import generateResponse from "../../utils/generateResponse.js";
import { validationResult } from "express-validator";

export const createAccount = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(generateResponse(false, {}, errors.array()));
    }

    const account = await accountService.createAccount(req.user.id, req.body);
    res.status(201).json(generateResponse(true, account, "Account created"));
  } catch (error) {
    next(error);
  }
};

export const getAccounts = async (req, res, next) => {
  try {
    const accounts = await accountService.getAccounts(req.user.id);
    res.json(generateResponse(true, accounts, "Accounts fetched"));
  } catch (error) {
    next(error);
  }
};

export const getAccount = async (req, res, next) => {
  try {
    const account = await accountService.getAccountById(req.user.id, req.params.id);
    if (!account) return res.status(404).json(generateResponse(false, {}, "Account not found"));
    res.json(generateResponse(true, account, "Account fetched"));
  } catch (error) {
    next(error);
  }
};

export const updateAccount = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(generateResponse(false, {}, errors.array()));
    }

    const updated = await accountService.updateAccount(req.user.id, req.params.id, req.body);
    res.json(generateResponse(true, updated, "Account updated"));
  } catch (error) {
    next(error);
  }
};

export const deleteAccount = async (req, res, next) => {
  try {
    await accountService.deleteAccount(req.user.id, req.params.id);
    res.json(generateResponse(true, {}, "Account deleted"));
  } catch (error) {
    next(error);
  }
};
