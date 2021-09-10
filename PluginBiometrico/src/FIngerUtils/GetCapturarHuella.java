/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package FIngerUtils;

import java.awt.AWTException;
import java.awt.HeadlessException;
import java.awt.Robot;
import java.awt.Toolkit;
import java.awt.event.InputEvent;

/**
 *
 * @author Mauricio Herrera
 */
public class GetCapturarHuella {

    public static CapturarHuella ch;
    public static int BARRA_DE_ESTADO = 40;

    public static CapturarHuella getCapturarHuella() throws AWTException {
        if (ch == null) {
            try {
                ch = new CapturarHuella();
                int sizeX = ch.getWidth();
                int sizeY = ch.getHeight();
                int maxSizeX = (int) Toolkit.getDefaultToolkit().getScreenSize().getWidth();
                int maxSizeY = (int) Toolkit.getDefaultToolkit().getScreenSize().getHeight();
                ch.setLocation(maxSizeX - sizeX, maxSizeY - sizeY - BARRA_DE_ESTADO);
                ch.setAlwaysOnTop(true);
                ch.requestFocus();
                ch.getCursor();
                ch.setVisible(true);
                ch.setOpacity(0.03f);            
            } catch (HeadlessException | SecurityException e) {
                System.out.println("Error " + e.getMessage());
            }
        } else {
            Robot r = new Robot();
            int tamX = ch.getWidth();
            int tamy = ch.getHeight();
            int maxX = (int) Toolkit.getDefaultToolkit().getScreenSize().getWidth();
            int maxY = (int) Toolkit.getDefaultToolkit().getScreenSize().getHeight();
            r.mouseMove(maxX + 250 - tamX, maxY - tamy + 10);
            r.mousePress(InputEvent.BUTTON1_MASK);
            r.mouseRelease(InputEvent.BUTTON1_MASK);
        }

        return ch;
    }

    public static void setCapturarHuella() {
        ch = null;
    }

}
