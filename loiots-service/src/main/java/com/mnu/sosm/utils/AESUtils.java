package com.mnu.sosm.utils;

import org.apache.tomcat.util.codec.binary.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;

/**
 * 功能：AES 工具类
 * 说明：
 * @author Mr.tjm
 * @date 2020-5-20 11:25
 */
@SuppressWarnings("all")
public class AESUtils {
    private static final Logger logger = LoggerFactory.getLogger(AESUtils.class);

//    private static String SECRETKEY = "SOCOwWPk7mWcyQsCGC81Uw==";
    private static String SECRETKEY = "QZ1XOzRB0bCZUSJTH1QKpQ==";

    private static String  IV = "QZ1XOzAAAACZUSJTH1QKpQ==";

    public final static String KEY_ALGORITHMS = "AES";

    public final static String CIPHER_MODE = "AES/CBC/NoPadding";
    public final static int KEY_SIZE = 128;

    /**
     * 生成AES密钥，base64编码格式 (128)
     * @return
     * @throws Exception
     */
    public static String getKeyAES_128() throws Exception{
        KeyGenerator keyGen = KeyGenerator.getInstance(KEY_ALGORITHMS);
        keyGen.init(KEY_SIZE);
        SecretKey key = keyGen.generateKey();
        String base64str = Base64.encodeBase64String(key.getEncoded());
        return base64str;
    }

    /**
     * 生成AES密钥，base64编码格式 (256)
     * @return
     * @throws Exception
     */
    public static String getKeyAES_256() throws Exception{
        // 256需要换jar包暂时用128
        String base64str = getKeyAES_128();
        return base64str;
    }

    /**
     * 根据base64Key获取SecretKey对象
     * @param base64Key
     * @return
     */
    public static SecretKey loadKeyAES(String base64Key){
//        byte[] bytes = Base64.decodeBase64(base64Key);
        byte[] bytes = new byte[0];
        try {
            bytes = base64Key.getBytes("utf-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        SecretKeySpec secretKeySpec = new SecretKeySpec(bytes, KEY_ALGORITHMS);
        return secretKeySpec;
    }


    public static void main(String... args) throws Exception {
        System.out.println(getKeyAES_128());
        try {
            String miwen = encrypt(SECRETKEY,"我是周杰伦","utf-8");
            System.out.println(miwen);
            //0emnG0DuxLMTjEJOpa3T3A==
            String jiemi = decrypt(SECRETKEY,miwen,"utf-8");
            System.out.println(jiemi);
            System.out.println(System.getProperty("file.encoding"));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    /**
     * AES 加密字符串，SecretKey对象
     * @param key
     * @param encryptData
     * @param encode
     * @return
     */
    public static String encrypt(SecretKey key, String encryptData, String encode) {
        try {
            final Cipher cipher = Cipher.getInstance(CIPHER_MODE);
            cipher.init(Cipher.ENCRYPT_MODE, key);
            byte[] encryptBytes = encryptData.getBytes(encode);
            byte[] result = cipher.doFinal(encryptBytes);
            return Base64.encodeBase64String(result);
        } catch (Exception e) {
            logger.error("加密异常:" + e.getMessage());
            return null;
        }
    }

    /**
     * AES 加密字符串，base64Key对象
     * @param base64Key
     * @param encryptData
     * @param encode
     * @return
     */
    public static String encrypt(String base64Key, String encryptData, String encode) {
        SecretKey key = loadKeyAES(base64Key);
        try {
            final Cipher cipher = Cipher.getInstance(CIPHER_MODE);
            IvParameterSpec ivspec = new IvParameterSpec(IV.getBytes());
            cipher.init(Cipher.ENCRYPT_MODE, key,ivspec);
            byte[] encryptBytes = encryptData.getBytes(encode);
            byte[] result = cipher.doFinal(encryptBytes);
            return Base64.encodeBase64String(result);
        } catch (Exception e) {
            logger.error("加密异常:" + e.getMessage());
            return null;
        }
    }

    /**
     * AES 解密字符串，SecretKey对象
     * @param key
     * @param decryptData
     * @param encode
     * @return
     */
    public static String decrypt(SecretKey key, String decryptData, String encode) {
        try {
            final Cipher cipher = Cipher.getInstance(CIPHER_MODE);
            IvParameterSpec ivspec = new IvParameterSpec(IV.getBytes());
            cipher.init(Cipher.DECRYPT_MODE, key, ivspec);
            byte[] decryptBytes = Base64.decodeBase64(decryptData);
            byte[] result = cipher.doFinal(decryptBytes);
            return new String(result, encode);
        } catch (Exception e) {
            logger.error("加密异常:" + e.getMessage());
            return null;
        }
    }

    /**
     * AES 解密字符串，base64Key对象
     * @param base64Key
     * @param decryptData
     * @param encode
     * @return
     */
    public static String decrypt(String base64Key, String decryptData, String encode) {
        SecretKey key = loadKeyAES(base64Key);
        try {
            final Cipher cipher = Cipher.getInstance(CIPHER_MODE);
            cipher.init(Cipher.DECRYPT_MODE, key);
            byte[] decryptBytes = Base64.decodeBase64(decryptData);
            byte[] result = cipher.doFinal(decryptBytes);
            return new String(result, encode);
        } catch (Exception e) {
            logger.error("加密异常:" + e.getMessage());
            return null;
        }
    }
}
